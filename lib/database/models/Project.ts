import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: String,
  name: String,
  expenseList: Array,
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
