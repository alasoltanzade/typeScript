//Triple-Slash Directives


//path : This directive tells the TypeScript compiler where to find another file that your current file depends on.
/// <reference path="reference6.ts" />


//type : This directive is used to include type definitions from external libraries
// / <reference types="node" />
//This tells the compiler, "I want to use the Node.js types in this file."


//lib : This is used to include built-in type libraries like DOM
//These are standard sets of types that come with TypeScript
/// <reference lib="es2015" />
/// <reference lib="es2017.string" />


//This directive marks a file as a default library
/// <reference no-default-lib="true"/>


//By default AMD modules are generated anonymous. This can lead to problems when other tools are used to process the resulting modules
/// <amd-module name="NamedModule"/>


// informs the compiler about a non-TS module dependency that needs to be injected in the resulting module’s require call.
/// <amd-dependency path="legacy/moduleA" name="moduleA"/>
declare var moduleA;
moduleA.callStuff();


