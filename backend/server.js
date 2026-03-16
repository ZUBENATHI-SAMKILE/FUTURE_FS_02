const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const bcrypt    = require("bcryptjs");
const jwt       = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database 
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/crm")
  .then(() => console.log("  MongoDB connected"))
  .catch(err => console.error("  MongoDB error:", err));

// Schemas 
const LeadSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     String,
  company:   String,
  source:    { type: String, enum: ["Website","Referral","LinkedIn","Cold Outreach","Other"], default: "Website" },
  status:    { type: String, enum: ["new","contacted","qualified","converted","lost"],        default: "new"     },
  note:      { type: String, default: "" },
  createdAt: { type: String, default: () => new Date().toISOString().slice(0, 10) },
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Lead  = mongoose.model("Lead",  LeadSchema);
const Admin = mongoose.model("Admin", AdminSchema);

// Auth middleware 
const SECRET = process.env.JWT_SECRET || "change_me_in_production";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Auth routes 

// POST /api/auth/register  ← run once to create your admin
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const admin = await Admin.create({ username, password: hash });
    res.json({ message: "Admin created", id: admin._id });
  } catch {
    res.status(400).json({ error: "Username already taken" });
  }
});

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await bcrypt.compare(password, admin.password)))
    return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: admin._id, username }, SECRET, { expiresIn: "8h" });
  res.json({ token });
});

//Lead routes (all protected) 

// GET /api/leads?status=new&search=sarah
app.get("/api/leads", auth, async (req, res) => {
  const { status, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) filter.$or = [
    { name:  { $regex: search, $options: "i" } },
    { email: { $regex: search, $options: "i" } },
  ];
  res.json(await Lead.find(filter).sort({ createdAt: -1 }));
});

// POST /api/leads
app.post("/api/leads", auth, async (req, res) => {
  try   { res.status(201).json(await Lead.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

// GET /api/leads/:id
app.get("/api/leads/:id", auth, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json(lead);
});

// PATCH /api/leads/:id  (update status, note, or any field)
app.patch("/api/leads/:id", auth, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json(lead);
});

// DELETE /api/leads/:id
app.delete("/api/leads/:id", auth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Stats route
// GET /api/stats
app.get("/api/stats", auth, async (req, res) => {
  const [total, byStatus, bySource] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }]),
  ]);
  res.json({ total, byStatus, bySource });
});

//Public route (website contact form → CRM)
// POST /api/public/leads  , no auth needed
app.post("/api/public/leads", async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, status: "new", source: req.body.source || "Website" });
    res.status(201).json({ message: "Lead received", id: lead._id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`  API running on http://localhost:${PORT}`));