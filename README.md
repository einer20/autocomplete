# Einer's autocomplete

Einers's implementation of a POC autocomplete with pure react. 

## Run the project
To run the project first install the dependencies:

```js
npm install
```

Then:
```js
npm run start
```

## Usage

The autocomplete component makes search easier by displaying the items that match the search. Here is the basic configuration:

```
 <Autocomplete 
    items={countries}
    label='Countries'
    getLabel={x => x.name} />
```

By using the `onChange` event you can get the selected item:


```
 <Autocomplete 
    items={countries}
    label='Countries'
    onChange={x=> alert(JSON.string(x))}
    getLabel={x => x.name} />
```

The component has multiple accesibilities options:

`closeOnNavigationSelection`: Close the autocomplete results when an item is selected.

`clearOnScape`: If true, clears the input on `Escape` key press.
