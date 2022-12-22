import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPMethod } from '../../types/api';
import { ProjectItem, ExpenseItem } from '../../types/database';

const postLogic = (project: ProjectItem) => {};

// Only relevant once editing is possible. Going to be used to add or remove expenses from individual projects.
const putLogic = (projectID: string, expense: ExpenseItem) => {};

// This get request should be a dynamic endpoint. /api/database/{id}
const getLogic = (id: string) => {};

// I need to write some loops due to the schema not being designed well. Would need 30 minutes of consideration to build but can't due to time constraints.
const deleteLogic = (projectID: string, expenseID: string, data: any) => {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, project } = req.body;

  switch (method) {
    case HTTPMethod.GET: {
      try {
      } catch (e) {}
      break;
    }
    case HTTPMethod.POST: {
      try {
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
