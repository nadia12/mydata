import EntityList from './entity-list.json';
import Model from './model.json';
import Dataset from './dataset.json';
import Sensor from './sensor.json';
import FunctionDoc from './function-doc.json';
import SampleDataCsv from './sample-data-csv.json';
import SampleDataSql from './sample-data-sql.json';
import SampleDataXls from './sample-data-xls.json';

const MY_DATA = {
  entityList: EntityList,
  model: Model,
  dataset: Dataset,
  functionDoc: FunctionDoc,
  sensor: Sensor,
  sampleData: {
    csv: SampleDataCsv,
    sql: SampleDataSql,
    xls: SampleDataXls
  }
};


export default MY_DATA;
