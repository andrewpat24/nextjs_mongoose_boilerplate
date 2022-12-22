import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPMethod } from '../../../types/api';
import { ProjectItem, ExpenseItem } from '../../../types/database';
import dbConnect from '../../../lib/database/dbConnect';
import Project from '../../../lib/database/models/Project';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, project, projectID } = req.body;

  try {
    const db = await dbConnect();
  } catch (e) {
    console.error(`A problem occurred while connecting to the database`);
  }

  switch (method) {
    // Get all Projects
    case HTTPMethod.GET: {
      try {
        const projects = await Project.find({});
        return res.status(200).json({ success: true, data: projects });
      } catch (e) {
        console.error(e);
      }
      break;
    }
    case HTTPMethod.POST: {
      try {
        const newProject = await Project.create(project); /* create a new model in the database */
        return res.status(201).json({ success: true, data: newProject });
      } catch (e) {}
      break;
    }
    case HTTPMethod.PUT: {
      try {
      } catch (e) {}
      break;
    }
    case HTTPMethod.DELETE: {
      try {
        const deletedProject = await Project.deleteOne({ _id: projectID });
        if (!deletedProject) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: {} });
      } catch (e) {}
      break;
    }
    default: {
      // return res.status(400).json({ status: 'error', error: 'Invalid HTTP Method' });
    }
  }

  return res.status(200).json({ body: req.body });
};

export default handler;
