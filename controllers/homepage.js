const { response } = require("express");
const fs = require('fs')

const getUsage = (req, res = response) => {
  const { numberOfUsers = 5, userId } = req.query;

  try {
    let record = getUserData();
    if (userId) {
      record = record.filter(d => d.uuid === userId)
    }
    res.json(record.slice(0, numberOfUsers));
  } catch (err) {
    console.error(err);
  }
};

const getUsers = (req, res = response) => {
  const { numberOfUsers = 5 } = req.query;

  try {
    res.json(getUserData().slice(0, numberOfUsers).map(({ firstName, lastName, uuid }) => ({ uuid, firstName, lastName })));
  } catch (err) {
    console.error(err);
  }
};

const addNote = (req, res = response) => {
  const { note, userId } = req.body;

  try {
    const data = getUserData()
    const existingIndex = data.findIndex(user => user.uuid === userId)
    if (!existingIndex) {
      return res.status(404).send({ error: true, msg: 'User does not exist exist' })
    }
    data[existingIndex].note = note
    saveData(data)
    res.json(data[existingIndex]);
  } catch (err) {
    console.error(err);
  }
};

const saveData = (updatedData) => {
  try {
    const stringifyData = JSON.stringify(updatedData, null, 2)
    fs.writeFileSync('./data.json', stringifyData)
  } catch (error) {
    console.error(error)
  }
}

const getUserData = () => {
  const jsonData = fs.readFileSync('./data.json')
  return JSON.parse(jsonData)    
}

module.exports = {
  getUsage,
  getUsers,
  addNote
};
