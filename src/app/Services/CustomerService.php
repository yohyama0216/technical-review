<?php

namespace App\Services;

use App\Models\Customer;

class CustomerService
{
    public function getAllCustomers($paginate = 10)
    {
        return Customer::paginate($paginate);
    }
}
