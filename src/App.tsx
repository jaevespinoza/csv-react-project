import { ChangeEvent, useState } from "react";
import "./App.scss";

const App = () => {
  const [data, setData] = useState([]);

  const handleData = (result: string) => {
    console.log(typeof result);
    const csvHeader = result.slice(0, result.indexOf("\n")).split(",");
    const csvRows = result.slice(result.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {} as { [key: string]: any });
      return obj;
    });

    setData(array);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files![0];

    const reader = new FileReader();
    reader.onload = (e) => {
      // Use reader.result
      handleData(reader.result as string);
    };
    reader.readAsText(uploadedFile);
  };

  const headerKeys = Object.keys(Object.assign({}, ...data));

  return (
    <div className="body">
      <div>
        <h1>Import csv</h1>
      </div>
      <div className="body__import">
        <input
          type="file"
          accept=".csv"
          id="csvFileInput"
          onChange={handleOnChange}
        />
        <button className="body__import__button">Import CSV</button>
      </div>

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
