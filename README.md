jquery-calendar
===============

A simple calendar and date picker base on jquery

## Live demo

See [this page](http://oneyoung.im/jquery-calendar/demo).

## Usage

### Header
+ include jQuery
```html
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

+ add js & css
```html
  <script type="text/javascript" src="js/calendar.js"></script>
  <link rel="stylesheet" href="css/style.css" />
```

### Calendar
two way invoke calendar

+ use default class, just set your class to `jquery-calendar`
```html
<div class="jquery-calendar"></div>
```

+ call the plugin, with js `$.calendar()`.
```js
$('#element').calendar();
/* one with default date */
$('#element2').calendar({'date': new Date()});
```

### Data Picker

Here we use the date format as `YYYY-MM-DD`. You can add a default date as value:
```html
<input class="date-picker" type="text" value="2013-8-1" />
```

Also, two way to use it.

+ use default class: `date-picker`
```html
<input class="date-picker" type="text" />
```

+ invoke with js `$.datePicker()`
```html
<script>
$(window).load(function() {
  $(".your-picker").datePicker();
}
</script>
<input class="your-picker" type="text" />
```
