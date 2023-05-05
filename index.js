const contacts = require("./contacts");
//const yargs = require("yargs");
//const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "read":
            const allContacts = await contacts.getAll();
            return console.log(allContacts);
        case "getById":
            const oneContact = await contacts.getById(id);
            return console.log(oneContact);
        case "add":
            const newContact = await contacts.add({ name, email, phone });
            return console.log(newContact);
        case "updateById":
            const updateContact = await contacts.updateById(id, { name, email, phone });
            return console.log(updateContact);
        case "deleteById":
            const deleteContact = await contacts.deleteById(id);
            return console.log(deleteContact);
        default:
            return console.log("Uncnown action");
    }
}
//invokeAction({ action: "read" });
//invokeAction({ action: "getById", id: "rsKkOQUi80UsgVPCcLZZW" });
//invokeAction({ action: "add", name: "Vasia", email: "15@ukr.net", phone: "555-888" });
//invokeAction({ action: "updateById", id: "x3v1ckiH4_vAyKYJcy_GY", name: "Vasiliy", email: "15@ukr.net", phone: "555-888" });
//invokeAction({ action: "deleteById", id: "x3v1ckiH4_vAyKYJcy_GY"});

//для yargs
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);

//для commander
program
    .option("-a, --action, <type>")
    .option("-i, --id, <type>")
    .option("-n, --name, <type>")
    .option("-e, --email, <type>")
    .option("-p, --phone, <type>");
program.parse();//раніше треба було так program.parse(process.argv);
const options = program.opts(); 

invokeAction(options);

