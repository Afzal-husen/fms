mysql notes

// create table
// sqlConnection.query("CREATE TABLE employee (id VARCHAR(255), name VARCHAR(255), salary VARCHAR(255))")

//insert a row/record
const insert_record = () => {
  // new record
  const newRow =
    "INSERT INTO employee (id, name, salary) VALUES (12, 'akil', 6000)";

  // execute query
  sqlConnection.query(newRow, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
// insert_record()

// insert multiple records
const insert_multiple_records = () => {
  var values = [
    [1, "John1", 5000],
    [2, "John2", 6000],
    [3, "John3", 7000],
    [4, "John4", 8000],
    [5, "John5", 8000],
    [6, "John6", 4000],
    [7, "John7", 3000],
    [8, "John8", 5000],
    [9, "John9", 6000],
    [10, "John10", 1000],
  ];

  // new record
  const new_records = "INSERT INTO employee (id, name, salary) VALUES ?";

  //   execute query
  sqlConnection.query(new_records, [values], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Number of records inserted: " + result.affectedRows);
    }
  });
};

// insert_multiple_records()

// select
const select = () => {
  // column/field
  const columns = "SELECT name FROM employee";
  // row/record
  const record = "SELECT * FROM employee WHERE salary = 5000";
  const search = "SELECT * FROM employee WHERE name LIKE 'A%'";
  //escaping a query value
  const name = "john";
  const salary = 5000;
  const singleField = "SELECT * FROM employee WHERE name = ?";
  const multiValField = "SELECT * FROM employee WHERE name = ? OR salary = ?";

  //sort  DESC-descending
  const sort_by_name = "SELECT * FROM employee ORDER BY name";
  const sort_by_salary = "SELECT * FROM employee ORDER BY salary";
  const sort_by_id = "SELECT * FROM employee ORDER BY id";

  sqlConnection.query(sort_by_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
};

// select()

//delete
const delete_record = () => {
  const delete_row = "DELETE FROM employee WHERE name = 'joh8'";
  sqlConnection.query(delete_row, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
// delete_record()

//drop table
// sqlConnection.query("DROP TABLE employee")

// update field
const update_field = () => {
  const updated = "UPDATE employee SET name = 'john10' WHERE name = 'john13' ";

  sqlConnection.query(updated, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
// update_field()

// limit number of records

const limit = () => {
  const sql = "SELECT * FROM employee LIMIT 2 OFFSET 2";
  sqlConnection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
};
// limit()