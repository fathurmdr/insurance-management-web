<h1 align="center">Insurance Management Website</h1>
<p align="center"><em>Created By: Fathu Rahman</em></p>

## Tech Stack

This project is built with the following technologies:

- PHP 8.2.8
- MySQL 8.1.0
- Laravel 10.10
- Inertia.js/React 1.0.0
- React 18.2.0 using TypeScript

## How To Run

Follow these steps in your terminal:

1. Run `composer install`
2. Execute `php artisan migarte --seed`
3. Execute `php artisan serve`

The application will be accessible on your web browser at [localhost:8000](http://localhost:8000). If you encounter a blank page, you may need to run `yarn && yarn dev` (ensure you have globally installed Yarn by running `npm install --global yarn`).

## Application URLs

- [Login Page](http://localhost:8000/login): Admin must log in before managing insurance data using email `admin@example.com` and password `adminpassword`.
- [Member Page](http://localhost:8000/member): Admin can view members' data on this page. There's an "Action" column that allows the admin to navigate to the **edit member page** or **terminate member**. At the top-left corner of the page, there's an "Add Member" button to navigate to the page for adding new members. The admin can also bulk-terminate members by selecting them and clicking "Terminate" in the **action dropdown** at the top-right.
- [Add Member Page](http://localhost:8000/create): Admin can add new members on this page.
- [Edit Member Page](http://localhost:8000/1/edit): Admin can edit member information on this page.
- [Claim Page](http://localhost:8000/claim): Admin can view claims data on this page. The "Action" column allows the admin to navigate to the **process claim page** or **print a letter of guarantee**. Printing a letter of guarantee is only available for approved claims.
- [Process Claim Page](http://localhost:8000/1/process): Admin can approve or reject claims from providers on this page.

## Public APIs

- [Member Detail API by Member Number](http://localhost:8000/api/member/MBR0001)
- [Claim Detail API by Claim Number](http://localhost:8000/api/claim/CLM0001)
- [Print Letter of Guarantee by Claim Number](http://localhost:8000/api/claim/CLM0001/letter-of-guarantee)
