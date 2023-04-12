Run `npm dev` to see the magic

## States

```
// declare a state
const count = signal(0);

const handler = () => {
    count.value++;
}
```

```
// declare a derived state, it will be updated every time its dependencies update
const doubled = derive(count, c => c * 2);
```

## Markup

```
//binding events use either on: or @
<button @click="myEvent">Click me</button>
<input on:input="changeInput" />
```

```
//setting attributes to JS values use : prefix
const secretId = 123;

<div :id="secretId">...

//setting attributes to signals use : prefix
const count = signal(0);

<div :data-count="count">...
```

```
// to interpolate text use {{ }}
<div>{{ count }}</div>
```
