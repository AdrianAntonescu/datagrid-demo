# DatagridDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.22.

## Development server

Go to root path and install dependencies

```bash
npm install
```

To start the app locally, go to the root path and run

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.
You will be redirected to the /demo route where you can see all the components with some of their behaviors.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## App description

The app showcases the use of t-grid and t-progress components.

On the /demo page you will find multiple examples of progress indicators and data grids.

Progress:

- you can see progress components with 0% completion, different sizes, colors for progress indication and also live updates
- by pressing the "Reload progress" button, you can reload the state of the progress components
- there is also a progress indicator under the section "No data table" -> whenever the progress component finishes loading, the empty table is displayed

Grid:

- you can see an empty and unsortable table displayed hidden behind the progress indicator (it is beind displayed when the loading ends)
- the second table is a table with pagination, which has a default page size of 5 entries and has 2 sortable columns: "Name" and "Population"; whenever you sort a column or change the page you are looking at, data is updated and sent to the table
- the third table is a table with pagination, but without a starting page size which falls back to displaying the whole data set; this table is also not sortable, even though in the html, its columns have the "sortable" property set to true (this happens because the inner "sortable" property of the grid defaults to false)
