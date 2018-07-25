const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};

var bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
};

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;
var command = argv._[0];

if( command === 'add') {
	var note = notes.addNote(argv.title, argv.body);

	if(note) {
		console.log('Note added.');
		notes.logNote(note);
	} else {
		console.log('Title already in use. Duplicate note not added.');
	}
} else if ( command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s)`);
	allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
	var note = notes.getNote(argv.title);

	if(note) {
		console.log('Note being read');
		notes.logNote(note);
	} else {
		console.log('No note found');
	}

} else if ( command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);
}else {
	console.log('Command not recognized');
}