'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // Constructor
  
  constructor (args, opts)
  {
    
    super (args, opts) ;

    this.config.getAll() ;

    this.config.defaults
    (
      {
        projectName: 'C++ Project',
        projectPath: "CppProject"
      }
    );

    this.interactive = true ;


    this.argument('name', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.config.set('projectName', this.options.name) ;
      this.config.set('projectPath', this.options.name) ;
      this.interactive = false ;
    }

  }

  prompting ()
  {

    if (!this.interactive)
    {
      return ;
    }


    return this.prompt
    (
      [
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: this.config.get('projectName')
        },
        {
          type: 'input',
          name: 'projectPath',
          message: 'Project path:',
          default: this.config.get('projectPath')
        }
      ]
    ).then(
      (answers) =>
      {
        this.config.set('projectName', answers['projectName']);
        this.config.set('projectPath', answers['projectPath']);
      }
    );
  }

  write() 
  {
    this._setupGit();
    this._setupBuild();
  }



  _setupGit ()
  {
    
    this.fs.copyTpl
    (
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.spawnCommand('git', ['init']) ;
    
  }

  _setupBuild() 
  {
    this.fs.copyTpl
    (
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath')
      }
    );

    this.fs.copyTpl
    (
      this.templatePath("vcpkg.json"),
      this.destinationPath("vcpkg.json"),
      {
        projectName: this.config.get('projectName')
      }
    );

    this.fs.copyTpl
    (
      this.templatePath("Jenkinsfile"),
      this.destinationPath("Jenkinsfile"),
      {
        projectName: this.config.get('projectName')
      }
    );

    this.fs.copy
    (
      this.templatePath("CppProject/main.cc"),
      this.destinationPath("src/" + this.config.get("projectPath") + "/main.cc")
    );
    
    this.fs.copy
    (
      this.templatePath("CppProject/CMakeLists.txt"),
      this.destinationPath("src/" + this.config.get("projectPath") + "/CMakeLists.txt")
    );
  }
};
