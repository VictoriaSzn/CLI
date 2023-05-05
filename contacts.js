

const fs = require('fs/promises');
const pach = require("path");
const { nanoid } = require("nanoid");

const contactsPach = pach.join(__dirname, "db", "contacts.json");

const updateContact =  async (contacts)=>await fs.writeFile(contactsPach, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const readFile = await fs.readFile(contactsPach);
    return JSON.parse(readFile);
}

const getContactById = async (id) => {
     const contacts = await listContacts();
     const result = contacts.find(item=> item.id === id); 
    return result||null;
 }

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id:nanoid(),
        ...data,
        
    }
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
}
 
const removeContact = async (id) => {
    const contacts = await listContacts();
     const index = contacts.findIndex(item=> item.id === id); // (item=> item.id === contactsId)
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}