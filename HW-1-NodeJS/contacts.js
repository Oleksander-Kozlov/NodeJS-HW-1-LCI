const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// Повертає масив контактів
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};
// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async (id) => {   
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
return result||null
}
// Повертає об'єкт доданого контакту.
const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
// Повертає об'єкт оновленого контакту.
const updateById = async (id, data)=>{
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
   return null
  }
  contacts[index] = { id, ...data }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}; 

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};
