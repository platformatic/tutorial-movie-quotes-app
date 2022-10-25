import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import platformaticDbRestProvider from './ra-data-platformatic-db-rest';

const restApiUrl = process.env.REACT_APP_PLATFORMATIC_DB_REST_API_URL;
const dataProvider = platformaticDbRestProvider(restApiUrl);

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="movies" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
        <Resource name="quotes" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
    </Admin>
);

export default App;
