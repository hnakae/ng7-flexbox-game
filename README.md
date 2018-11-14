READ ME

Follow these steps to get this app set up on your computer!

1. click on 'Clone or download'

2. copy the URL



3. -> git clone URL 

4. -> cd ng7-flexbox-game

5. -> npm install

<<<<<<< HEAD
6. -> ng serve -o 

------------NOTES-------------
Interpolation
@Component({
  selector: 'my-selector',
  template: '
  <h1>{{customer.FirstName}} Details</h1>
  <div>First: {{customer.FirstName}}</div>
  <div>Last: {{customer.FirstName}}</div>
  '
})
export class DemoComponent {
  id = 1;
  customer: Customer = {
    FirstName = 'abc';
    LastName = 'xyz';
  }
}
export class Customer{
  FirstName: string
  LastName: string;
}
=======
6. -> ng serve -o (will automatically open browser)


>>>>>>> 8588abce41fd88d09d2c1259ef1307ed6e863730
