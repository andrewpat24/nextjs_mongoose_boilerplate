import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPMethod } from '../../types/api';
import { Project, Expense, Data } from '../../types/database';

// export interface Expense {
//   id: string;
//   name: string;
//   amountRemaining: number;
//   paidOff: boolean;
// }

const Expense1: Expense = {
  id: 'sdfsdojk12lesdlfknm',
  name: 'E1',
  amountRemaining: 50,
  paidOff: false,
};

const Expense2: Expense = {
  id: 'sdfsdo234242424jk12lesdlfknm',
  name: 'E2',
  amountRemaining: 2130123,
  paidOff: false,
};

const Expense3: Expense = {
  id: 'sdfsdojk12lesdlfk764532331nm',
  name: 'E3',
  amountRemaining: 2130123,
  paidOff: false,
};

const Expense4: Expense = {
  id: 'sdfsdojk12lesd`14325675lfknm',
  name: 'E4',
  amountRemaining: 2130123,
  paidOff: false,
};

const Project1: Project = {
  id: 'sdfdsfsdfi234567663212ojjklnwefd',
  name: 'P1',
  expenseList: [Expense1, Expense2, Expense3, Expense4],
};

const Project2: Project = {
  id: 'sdfdsfsdfiojjkl123eiwjdnskcxnwefd',
  name: 'P2',
  expenseList: [Expense1, Expense2, Expense3, Expense4],
};

const Project3: Project = {
  id: 'sdfdsfsdfiojjklnwe89234239sdf89fd',
  name: 'P3',
  expenseList: [Expense1, Expense2, Expense3, Expense4],
};

const Project4: Project = {
  id: 'sdfdsfsdfi23498208341093ojjklnwefd',
  name: 'P4',
  expenseList: [Expense1, Expense2, Expense3, Expense4],
};

const data: Data = {
  projects: [Project1, Project2, Project3, Project4],
};

const postDBEntry = (project: Project, data: Data) => {
  console.log(data.projects, typeof data.projects);
  data.projects.push(project);

  const someObj = {
    thing: [] as any[],
  };

  someObj.thing.push(1);
  console.log(someObj.thing);
  return data.projects;
};

// Only relevant once editing is possible. Going to be used to add or remove expenses from individual projects.
const putDBEntry = (projectID: string, expense: Expense) => {};

// This get request should be a dynamic endpoint. /api/database/{id}
const getDBEntry = (id: string) => {};

// I need to write some loops due to the schema not being designed well. Would need 30 minutes of consideration to build but can't due to time constraints.
const deleteDBEntry = (projectID: string, expenseID: string, data: any) => {
  let projectIndex: number = 0;
  let expenseIndex: number = 0;
  data.projects.find((project: Project, index: number) => {
    if (project.id === projectID) {
      projectIndex = index;
      return true;
    }
    return false;
  });

  data.projects[projectIndex].expenses.find((expense: Expense, index: number) => {
    if (expense.id === expenseID) {
      expenseIndex = index;
      return true;
    }
    return false;
  });

  delete data.projects[projectIndex].expenseList[expenseIndex];

  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, projectID, project, expenseID, expense } = req.body;

  switch (method) {
    case HTTPMethod.GET: {
      try {
        getDBEntry(projectID);
      } catch (e) {}
      break;
    }
    case HTTPMethod.POST: {
      try {
        data.projects = postDBEntry(project, data);
      } catch (e) {}
      break;
    }
    case HTTPMethod.PUT: {
      try {
        putDBEntry(projectID, expense);
      } catch (e) {}
      break;
    }
    case HTTPMethod.DELETE: {
      try {
        deleteDBEntry(projectID, expenseID, data);
      } catch (e) {}
      break;
    }
    default: {
      // return res.status(400).json({ status: 'error', error: 'Invalid HTTP Method' });
    }
  }

  return res.status(200).json({ data, body: req.body });
};

export default handler;
