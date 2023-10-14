<?php

namespace App\Services;

class DiscountService
{
    private $amount;
    private $discountType;
    private $discountValue;

    const FLAT = 'flat';
    const PERCENTAGE = 'percentage';

    /**
     * DiscountService constructor.
     * @param float $amount - 購入金額
     * @param string $discountType - 割引タイプ（flat or percentage）
     * @param float $discountValue - 割引金額 or 割引率
     */
    public function __construct(float $amount, string $discountType, float $discountValue)
    {
        $this->amount = $amount;
        $this->discountType = $discountType;
        $this->discountValue = $discountValue;
    }

    /**
     * 割引後の金額を計算する
     *
     * @return float
     */
    public function calculate(): float
    {
        switch ($this->discountType) {
            case self::FLAT:
                return $this->amount - $this->discountValue;

            case self::PERCENTAGE:
                return $this->amount - ($this->amount * ($this->discountValue / 100));

            default:
                return $this->amount;
        }
    }
}
