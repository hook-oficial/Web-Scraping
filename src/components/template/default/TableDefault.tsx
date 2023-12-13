import { ChangeEvent, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Link } from 'react-router-dom';
import { useDefault } from '../../../store/storeTemplates';

function TableDefault() {

  const {
    dataDefault,
    useNoFilters,
    useFilterLastToFirst,
    useFilterFirstsNumbers,
    useFilterLastsNumbers,
    useFilterFirstsAndLastsNumbers, } = useDefault();

  const [firstsNumberOfItems, setFirstsNumberOfItems] = useState('');
  const [lastsNumberOfItems, setLastsNumberOfItems] = useState('');

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'YourTable',
    sheet: 'DefaultSheet',
  });

  const handleFilterLastToFirst = (event: ChangeEvent<HTMLInputElement>) => {
    useFilterLastToFirst();
    if (!event.target.checked) {
      useNoFilters();
    };
  };

  const handleFilterFirstsNumbers = (event: ChangeEvent<HTMLInputElement>) => {
    if (firstsNumberOfItems !== '') {
      useFilterFirstsNumbers(Number(firstsNumberOfItems));
      if (!event.target.checked) {
        useNoFilters();
      };
    };
  };

  const handleFilterLastsNumbers = (event: ChangeEvent<HTMLInputElement>) => {
    if (lastsNumberOfItems !== '') {
      useFilterLastsNumbers(Number(lastsNumberOfItems));
      if (!event.target.checked) {
        useNoFilters();
      };
    };
  };

  const handleFilterFirstsAndLastsNumbers = (event: ChangeEvent<HTMLInputElement>) => {
    useFilterFirstsAndLastsNumbers()
    if (!event.target.checked) {
      useNoFilters();
    };
  };


  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">DEFAULT TEMPLATE</h1>

      <Link to="/" className="text-white-600">~ Go Back ~</Link>

      <div className="container mx-auto p-4">

        {/* ----------------------------------------------------------------- */}

        <div>
          <div className="p-12 border m-6 rounded bg-neutral-800 dark:text-blue-50">

            <label>
              Default State
              <input
                id="four"
                name="NoFilters"
                type="checkbox"
                onClick={() => useNoFilters()} />
            </label>

          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div>
          <div className="p-12 border m-6 rounded bg-neutral-800 dark:text-blue-50">

            <label>
              Last To First
              <input
                id="four"
                name="FilterLastToFirst"
                type="checkbox"
                onChange={handleFilterLastToFirst} />
            </label>

          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div>
          <div className="p-12 border m-6 rounded bg-neutral-800 dark:text-blue-50">

            <label>
              Firsts Numbers
              <input
                id="number"
                name="FilterFirstsNumbers"
                type="number"
                value={firstsNumberOfItems}
                placeholder="choose one number"
                onChange={(e) => setFirstsNumberOfItems(e.target.value)}
              />

              <input
                id="four"
                name="name"
                type="checkbox"
                onChange={handleFilterFirstsNumbers}
              />

            </label>

          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div>
          <div className="p-12 border m-6 rounded bg-neutral-800 dark:text-blue-50">

            <label>
              Lasts Numbers
              <input
                id="number"
                name="FilterLastsNumbers"
                type="number"
                value={lastsNumberOfItems}
                placeholder="choose one number"
                onChange={(e) => setLastsNumberOfItems(e.target.value)}
              />

              <input
                id="four"
                name="name"
                type="checkbox"
                onChange={handleFilterLastsNumbers}
              />

            </label>

          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div>
          <div className="p-12 border m-6 rounded bg-neutral-800 dark:text-blue-50">

            <label>
              Firsts 5 and Lasts 5 Numbers
              <input
                id="four"
                name="FilterFirstsAndLastsNumbers"
                type="checkbox"
                onChange={handleFilterFirstsAndLastsNumbers} />
            </label>

          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="overflow-x-auto">

          <button onClick={onDownload}>Download Excel</button>

          <table ref={tableRef} className="min-w-full bg-neutral-800 shadow-md rounded-xl">

            <thead>
              <tr className="text-neutral-100 font-bold">
                <th className="py-3 px-4 text-left">Index</th>
                <th className="py-3 px-4 text-left">Titles</th>
                <th className="py-3 px-4 text-left">Descriptions</th>
              </tr>
            </thead>

            <tbody className="text-blue-gray-900">
              {dataDefault.map(item => (
                <tr key={item.id} className="bg-blue-gray-100 ">
                  <td className="text-neutral-100 font-bold">{item.id}</td>
                  <td className="text-neutral-100 font-bold">{item.title}</td>
                  <td className="text-neutral-100 font-bold">{item.description}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>

  );

};

export default TableDefault;