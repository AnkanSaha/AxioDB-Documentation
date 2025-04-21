import React, { useState } from 'react';
import { Code, BookOpen } from 'lucide-react';
import CodeBlock from '../ui/CodeBlock';
import Button from '../ui/Button';

const Usage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'commonjs' | 'es6'>('commonjs');
  
  const commonjsCode = `const { AxioDB, SchemaTypes } = require("axiodb");

const main = async () => {
  const db = new AxioDB();

  // Create a database
  const db1 = await db.createDB("testDB");

  // Define a schema
  const schema = {
    name: SchemaTypes.string().required(),
    age: SchemaTypes.number().required().min(1).max(100),
    email: SchemaTypes.string().required().email(),
  };

  // Create collections
  const collection = await db1.createCollection("testCollection", schema);
  const collection2 = await db1.createCollection(
    "testCollection2",
    schema,
    true,
  );
  const collection3 = await db1.createCollection(
    "testCollection3",
    schema,
    "myKey",
  );

  // Insert data
  const saveStatus = await collection.insert({
    name: "Ankan",
    age: 21,
    email: "ankan@example.com",
  });
  console.log(saveStatus);

  // Query data
  const totalDocuments = await collection
    .query({})
    .Limit(1)
    .Skip(0)
    .Sort({ name: 1 })
    .setCount(true)
    .setProject({ name: 1, age: 1 })
    .exec();
  console.log(totalDocuments);

  const FastDocument = await collection
    .query({ documentId: "S4ACDVS6SZ4S6VS" })
    .exec(); // By using documentId you can get the document in Lightning Fast Speed
  console.log(FastDocument);

  const ArrayFirstDocument = await collection
    .query({ documentId: ["S4ACDVS6SZ4S6VS", "VESV61Z6VS16VSE6V1S"] })
    .exec(); // query using an array of documentId to get multiple documents in lightning fast speed
  console.log(ArrayFirstDocument);

  // Update data
  const updatedDocuments = await collection
    .update({ name: { $regex: "Ankan" } })
    .UpdateOne({ name: "Ankan Saha", age: 22 });
  console.log(updatedDocuments);

  // Delete data
  const deletedDocuments = await collection
    .delete({ name: { $regex: "Ankan" } })
    .deleteOne();
  console.log(deletedDocuments);

  // Aggregation
  const response = await collection
    .aggregate([
      { $match: { age: { $gt: 20 }, name: { $regex: "Ankan" } } },
      { $group: { _id: "$age", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, age: "$_id", count: 1 } },
      { $limit: 10 },
      { $skip: 0 },
    ])
    .exec();
  console.log(response);
};

main();`;

  const es6Code = `import { AxioDB, SchemaTypes } from "axiodb";

const main = async () => {
  const db = new AxioDB();

  // Create a database
  const db1 = await db.createDB("testDB");

  // Define a schema
  const schema = {
    name: SchemaTypes.string().required(),
    age: SchemaTypes.number().required().min(1).max(100),
    email: SchemaTypes.string().required().email(),
  };

  // Create collections
  const collection = await db1.createCollection("testCollection", schema);
  const collection2 = await db1.createCollection(
    "testCollection2",
    schema,
    true,
  );
  const collection3 = await db1.createCollection(
    "testCollection3",
    schema,
    "myKey",
  );

  // Insert data
  const saveStatus = await collection.insert({
    name: "Ankan",
    age: 21,
    email: "ankan@example.com",
  });
  console.log(saveStatus);

  // Query data
  const totalDocuments = await collection
    .query({})
    .Limit(1)
    .Skip(0)
    .Sort({ name: 1 })
    .setCount(true)
    .setProject({ name: 1, age: 1 })
    .exec();
  console.log(totalDocuments);

  const FastDocument = await collection
    .query({ documentId: "S4ACDVS6SZ4S6VS" })
    .exec(); // By using documentId you can get the document in Lightning Fast Speed
  console.log(FastDocument);

  const ArrayFirstDocument = await collection
    .query({ documentId: ["S4ACDVS6SZ4S6VS", "VESV61Z6VS16VSE6V1S"] })
    .exec(); // query using an array of documentId to get multiple documents in lightning fast speed
  console.log(ArrayFirstDocument);

  // Update data
  const updatedDocuments = await collection
    .update({ name: { $regex: "Ankan" } })
    .UpdateOne({ name: "Ankan Saha", age: 22 });
  console.log(updatedDocuments);

  // Delete data
  const deletedDocuments = await collection
    .delete({ name: { $regex: "Ankan" } })
    .deleteOne();
  console.log(deletedDocuments);

  // Aggregation
  const response = await collection
    .aggregate([
      { $match: { age: { $gt: 20 }, name: { $regex: "Ankan" } } },
      { $group: { _id: "$age", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, age: "$_id", count: 1 } },
      { $limit: 10 },
      { $skip: 0 },
    ])
    .exec();
  console.log(response);
};

main();`;

  return (
    <section id="usage" className="pt-12 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-green-500" />
        Basic Usage
      </h2>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        AxioDB provides a simple and intuitive API for database operations. Below is a basic example to get you started:
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex gap-4 mb-4">
          <Button
            variant={activeTab === 'commonjs' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('commonjs')}
          >
            CommonJS
          </Button>
          <Button
            variant={activeTab === 'es6' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('es6')}
          >
            ES6 Modules
          </Button>
        </div>
        
        {activeTab === 'commonjs' ? (
          <CodeBlock code={commonjsCode} language="javascript" />
        ) : (
          <CodeBlock code={es6Code} language="javascript" />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">Key Concepts</h3>
          
          <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><strong>Database:</strong> A container for multiple collections</li>
            <li><strong>Collection:</strong> Similar to tables in SQL, collections store documents</li>
            <li><strong>Schema:</strong> Defines the structure and validation rules for documents</li>
            <li><strong>Document:</strong> A JSON-like data structure with fields and values</li>
            <li><strong>Query:</strong> Operations to retrieve, update, or delete documents</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">API Patterns</h3>
          
          <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><strong>Chainable Methods:</strong> Use fluent interfaces for complex queries</li>
            <li><strong>Async/Await:</strong> All operations return promises for async execution</li>
            <li><strong>Method Naming:</strong> Clear and consistent naming conventions</li>
            <li><strong>Error Handling:</strong> Detailed error messages for troubleshooting</li>
            <li><strong>TypeScript Support:</strong> Full type definitions for IDE assistance</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-8">
        <h3 className="font-semibold mb-2">Quick Tips</h3>
        <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>Always use <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">.exec()</code> at the end of query chains to execute the query</li>
          <li>For optimal performance, query by <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">documentId</code> whenever possible</li>
          <li>Use schemas to validate data before insertion</li>
          <li>Consider enabling encryption for sensitive data</li>
        </ul>
      </div>
    </section>
  );
};

export default Usage;