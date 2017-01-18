let helpers = require('yeoman-test');
let assert = require('yeoman-assert');
import * as path from 'path';

/**
 * Test addin from user answers
 * manifest-only project, default folder, defaul host.
 */
describe('manifest-only project - answers', () => {
	let projectDisplayName = 'My Office Add-in';
	let projectEscapedName = 'my-office-add-in';
	let answers = {
			name: projectDisplayName,
			new: 'manifest-only',
			folder: null,
			host: 'excel',
			ts: null,
			framework: null
		};
	let manifestFileName = 'manifest-' + answers.host + '-' + projectEscapedName + '.xml';

	/** Test addin when user chooses jquery and typescript. */
	describe('manifest-only', () => {
		before((done) => {
			helpers.run(path.join(__dirname, '../app')).withPrompts(answers).on('end', done);
		});

		it('creates expected files', (done) => {
			let expected = [
				manifestFileName,
				'package.json',
				'assets/icon-16.png',
				'assets/icon-32.png',
				'assets/icon-80.png',
				'assets/logo-filled.png'
			];

			assert.file(expected);
			done();
		});
	});
});

/**
 * Test addin from user answers and arguments
 * manifest-only project, default folder, typescript, jquery.
 */
describe('manifest-only project - answers & args - jquery & typescript', () => {
	let projectDisplayName = 'My Office Add-in';
	let projectEscapedName = 'my-office-add-in';
	let answers = {
		name: null,
		new: null,
		folder: null,
		host: null,
		ts: null,
		framework: null
	};
	let argument = [];

	/** 
	 * Test addin when user pass in argument 
	 * "my-office-add-in"
	 */
	describe('argument: name', () => {
		before((done) => {
			answers.new = 'manifest-only';
			answers.host = 'excel';
			argument[0] = projectEscapedName;

			helpers.run(path.join(__dirname, '../app')).withArguments(argument).withPrompts(answers).on('end', done);
		});

		it('creates expected files', (done) => {
			let host = argument[1] ? argument[1] : answers.host;
			let name = argument[0] ? argument[0] : answers.name;
			let manifestFileName = 'manifest-' + host + '-' + name  + '.xml';

			let expected = [
				manifestFileName,
				'package.json',
				'assets/icon-16.png',
				'assets/icon-32.png',
				'assets/icon-80.png',
				'assets/logo-filled.png'
			];

			assert.file(expected);
			done();
		});
	});

	/** 
	 * Test addin when user pass in argument 
	 * "my-office-add-in excel"
	 */
	describe('arguments: name host', () => {
		before((done) => {
			answers.new = 'manifest-only';
			argument[0] = projectEscapedName;
			argument[1] = 'excel';

			helpers.run(path.join(__dirname, '../app')).withArguments(argument).withPrompts(answers).on('end', done);
		});

		it('creates expected files', (done) => {
			let host = argument[1] ? argument[1] : answers.host;
			let name = argument[0] ? argument[0] : answers.name;
			let manifestFileName = 'manifest-' + host + '-' + name  + '.xml';

			let expected = [
				'package.json',
				'assets/icon-16.png',
				'assets/icon-32.png',
				'assets/icon-80.png',
				'assets/logo-filled.png'
			];

			assert.file(expected);
			done();
		});
	});

	/** 
	 * Test addin when user pass in argument 
	 * "my-office-add-in excel manifest-only"
	 */
	describe('arguments: name host', () => {
		before((done) => {
			argument[0] = projectEscapedName;
			argument[1] = 'excel';
			argument[2] = 'manifest-only';

			helpers.run(path.join(__dirname, '../app')).withArguments(argument).withPrompts(answers).on('end', done);
		});

		it('creates expected files', (done) => {
			let host = argument[1] ? argument[1] : answers.host;
			let name = argument[0] ? argument[0] : answers.name;
			let manifestFileName = 'manifest-' + host + '-' + name  + '.xml';

			let expected = [
				'package.json',
				'assets/icon-16.png',
				'assets/icon-32.png',
				'assets/icon-80.png',
				'assets/logo-filled.png'
			];

			assert.file(expected);
			done();
		});
	});
});