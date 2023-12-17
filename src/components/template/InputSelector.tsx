import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import specialSelectors from '../../consts/specialSelectors';
import { findElementInJson } from '../../scrapping/buildDOM/recursiveChildren';
import { extractDataFromElement } from '../../scrapping/extractDataFromElement';
import { useDOM } from '../../store/useDOM';
import { useFiltserJSON } from '../../store/useFilters';
interface Props {
  getSelectorResult: () => Element[] | [] | NodeList;
  jsonDom: ReactNodeStructure[]
}

function InputSelector({ getSelectorResult, jsonDom }: Props) {

  const {
    arrayResult,
    useNoFilters,
    useFilterLastToFirst,
    useFilterFirstsNumbers,
    useFilterLastsNumbers,
    useFilterFirstsAndLastsNumbers,
    useFilterNoContent, } = useFiltserJSON();

  const { DOM, copySelectorText, webSiteData } = useDOM();

  const [selectorValue, setSelectorValue] = useState('');

  const [jsonFile, setJsonFile] = useState<Record<string, any> | null>(null);

  const validateSelector = (selector: string) => {
    try {
      document.querySelector(selector);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getSpecialSelector = (selector: string) => {
    const specialSelectorsKeys = {
      [specialSelectors.getAllTexts]: `h1, h2, h3, h4, h5, h6, p, li, strong, b, small, span`,
      [specialSelectors.link]: `a`,
      [specialSelectors.media]: `img, audio, video`
    };

    const parts = selector.split(/\s+/);
    const specialSelector = parts[parts.length - 1];
    const checkRegexIsText = /^".*"$/;

    if (checkRegexIsText.test(selector)) {
      for (const dom of jsonDom) {
        const selectorClean = selector?.match(/^"(.*?)"$/)?.[1];
        if (!selectorClean) return null;
        const findElement = findElementInJson((e) => {
          const textContent = e.textContent?.replace(/\s+/g, ' ')?.trim()?.toLowerCase();
          return textContent === selectorClean;
        }, dom);
        if (!findElement) return null;
        const { parent, element } = findElement;
        console.log(findElement)
        const regex = /\s*[^ ]*:[^ ]*\s*|\S*\[.*?\]\S*|\S*\[.*?\]/g;
        const classNameToUse = element.className.replace(regex, '');
        const selectorResult = `${parent?.tagName} ${element.tagName}${classNameToUse.trim() ? "." + classNameToUse.split(' ').join('.') : ''}`;
        console.log(selectorResult)
        return !validateSelector(selectorResult) ? null : selectorResult
      }
    }

    if (parts.length > 1 && specialSelectorsKeys[specialSelector]) {
      const parentSelectors = parts.slice(0, -1).join(' ');
      if (specialSelectorsKeys[specialSelector].includes(',')) {
        const textSelectors = specialSelectorsKeys[specialSelector]
          .split(',')
          .map(textSelector => `${parentSelectors} ${textSelector.trim()}`)
          .join(', ');
        return textSelectors;
      }
      return `${parentSelectors} ${specialSelectorsKeys[specialSelector]}`;
    }
    return specialSelectorsKeys[selector] || (!validateSelector(selector) ? null : selector);
  };

  const buildArrayResult = (query: string) => {
    if (!query) return [];
    const queryToUse = getSpecialSelector(query);
    if (!queryToUse) return [];
    const result = DOM?.querySelectorAll(queryToUse);
    if (!result) return [];
    const mapResult = extractDataFromElement([...result], webSiteData.URL_href);
    return mapResult;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!(input && input instanceof HTMLInputElement)) return;
    const value = input.value.toLowerCase();
    setSelectorValue(value);
  }

  useEffect(() => {
    if (!copySelectorText) return;
    setSelectorValue(copySelectorText.toLowerCase());
  }, [copySelectorText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const arrayResult = buildArrayResult(selectorValue);
      const arrayString = JSON.stringify(arrayResult);
      localStorage.setItem("ArrayResult", arrayString);
    }, 1200);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorValue]);

  // FILTERS //
  const [firstsNumber, setFirstsNumber] = useState<number>(0);
  const [lastsNumber, setLastsNumber] = useState<number>(0);

  const handleFilterFirstsNumbers = () => {
    if (firstsNumber >= 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useFilterFirstsNumbers(firstsNumber);
    }
  };

  const handleFilterLastsNumbers = () => {
    if (lastsNumber >= 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useFilterLastsNumbers(lastsNumber);
    }
  };

  // DOWNLOAD EXEL //

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'scraping',
    sheet: 'DefaultSheet',
  });

  // DOWNLOAD JSON //

  const DownloadJSON = () => {

    setJsonFile(arrayResult);

    if (jsonFile) {
      const jsonContent = JSON.stringify(jsonFile, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'scraping.json';

      downloadLink.click();

      URL.revokeObjectURL(downloadLink.href);
    }

  };

  return (
    <>

      <label className="m-12 w-[80%] p-4 text-center">
        <h4 className="font-bold mb-2">Write your HTML selector to find</h4>
        <p>You can search  by any selector, either tag name, class name or id. Even you can find by father to child selector...</p>
        <input onInput={handleChange} value={selectorValue} className="p-4 mt-6 rounded w-full outline-none focus:opacity-80" type="text" placeholder="main.container#id" />
      </label>

      {/* ----------------------------------------------------------------- */}

      <section>

        <button className="bg-violet-600 rounded-md p-3 px-6 font-bold"
          onClick={DownloadJSON}>
          Download in Json
        </button>

        <span>OR</span>

        <button className="bg-violet-600 rounded-md p-3 px-6 font-bold"
          onClick={onDownload}>
          Download in Excel
        </button>

      </section>

      {/* ----------------------------------------------------------------- */}

      <button
        className="bg-blue-600 rounded-md p-3 px-6 font-bold"
        onClick={useNoFilters}
      >
        Default Value
      </button>

      {/* ----------------------------------------------------------------- */}

      <button
        className="bg-blue-600 rounded-md p-3 px-6 font-bold"
        onClick={useFilterLastToFirst}
      >
        Filter Last Numbers
      </button>

      {/* ----------------------------------------------------------------- */}

      <button
        className="bg-blue-600 rounded-md p-3 px-6 font-bold"
        onClick={handleFilterFirstsNumbers}
      >
        Filter First Numbers
      </button>

      <input
        type="number"
        value={firstsNumber}
        onChange={(e) => setFirstsNumber(parseInt(e.target.value, 10))}
      />

      {/* ----------------------------------------------------------------- */}

      <button
        className="bg-blue-600 rounded-md p-3 px-6 font-bold"
        onClick={handleFilterLastsNumbers}
      >
        Filter Lasts Numbers
      </button>

      <input
        type="number"
        value={lastsNumber}
        onChange={(e) => setLastsNumber(parseInt(e.target.value, 10))}
      />

      {/* ----------------------------------------------------------------- */}

      <button
        className="bg-blue-600 rounded-md p-3 px-6 font-bold"
        onClick={useFilterFirstsAndLastsNumbers}
      >
        Filter Firts and Lasts Numbers
      </button>

      {/* ----------------------------------------------------------------- */}

      <button
        className="bg-blue-600 rounded-md p-3 px-6 font-bold"
        onClick={useFilterNoContent}
      >
        Filter No Content
      </button>

      {/* ----------------------------------------------------------------- */}

      <table ref={tableRef} className="min-w-full bg-neutral-800 shadow-md rounded-xl">

        <thead>
          <tr className="text-neutral-100 font-bold">

            <th className="py-3 px-4 text-left">ID</th>

            <th className="py-3 px-4 text-left">Element</th>

            <th className="py-3 px-4 text-left">ClassName</th>

            <th className="py-3 px-4 text-left">
              {arrayResult.length > 0 && arrayResult[0].src ? "Image" : "Text"}
            </th>

            <th className="py-3 px-4 text-left">Route</th>

          </tr>
        </thead>

        <tbody className="text-blue-gray-900">

          {arrayResult.map((item) => (

            <tr key={item.id} className="bg-blue-gray-100">

              <td className="text-neutral-100 font-bold">{item.id}</td>

              <td className="text-neutral-100 font-bold">{item.element}</td>

              <td className="text-neutral-100 font-bold">{item.className}</td>

              <td className="text-neutral-100 font-bold">

                {item.src ?
                  (
                    <img src={item.src} alt="Image" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                  )
                  :
                  (
                    item.text
                  )
                }

              </td>

              <td className="py-3 px-4 text-left">

                {item.link ?
                  (<a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>)
                  :
                  (<a href={item.src} target="_blank" rel="noopener noreferrer">{item.src}</a>)
                }

              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
}

export default InputSelector;