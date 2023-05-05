

const fs = require('fs/promises');
const pach = require("path");
const { nanoid } = require("nanoid");

const contactsPach = pach.join(__dirname, "db", "contacts.json");
//для yargs

const updateContact =  async (contacts)=>await fs.writeFile(contactsPach, JSON.stringify(contacts, null, 2));
////замена повторяющейся строки кода

const getAll = async () => {
    const readFile = await fs.readFile(contactsPach);
    return JSON.parse(readFile);
}

const getById = async (id) => {
    //const contactsId = String(id);
    const contacts = await getAll();
     const result = contacts.find(item=> item.id === id); // (item=> item.id === contactsId)
    return result||null;
 }

const add = async (data) => {
    const contacts = await getAll();
    const newContact = {
        id:nanoid(),
        ...data,
        
    }
    contacts.push(newContact);
    await updateContact(contacts);
    ////await fs.writeFile(contactsPach, JSON.stringify(contacts, null, 2));
    return newContact;
}
 
const updateById = async (id, data) => {
    //const contactsId = String(id);
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id); // (item=> item.id === contactsId)
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, ...data };
    ////await fs.writeFile(contactsPach, JSON.stringify(contacts, null, 2));
    await updateContact(contacts);
    return contacts[index];
}
const deleteById = async (id) => {
    //const contactsId = String(id);
    const contacts = await getAll();
     const index = contacts.findIndex(item=> item.id === id); // (item=> item.id === contactsId)
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    //await fs.writeFile(contactsPach, JSON.stringify(contacts, null, 2));
    await updateContact(contacts);
    return result;
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById
}