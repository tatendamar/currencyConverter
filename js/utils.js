//setup indexeddb 
 const dbPromise = idb.open('currency-store', 1, function(db){
  if(!db.objectStoreNames.contains('currency')){
    db.createObjectStore('currency',{keyPath: 'id', autoIncrement: true});
  }
});

//method to write data to indexeddb
function writeData(name, data){
  return dbPromise
  .then(function(db){
    const tx = db.transaction(name, 'readwrite');
    const store = tx.objectStore(name);
    store.put(data);
   
    return tx.complete;
 });
};

//method to read data from indexeddb
function readAllData(name){
  return dbPromise
  .then(function(db){
    const tx = db.transaction(name, 'readonly');
    const store = tx.objectStore(name);
  
    return store.getAll();
  });
};