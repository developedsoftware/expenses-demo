<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExpenseClaimItemReceiptRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseClaimItemReceiptRepository::class)]
#[ApiResource]
class ExpenseClaimItemReceipt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaimItemReceipts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ExpenseClaimItem $expense_claim_item = null;

    #[ORM\Column(type: Types::BLOB)]
    private $data = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExpenseClaimItemId(): ?ExpenseClaimItem
    {
        return $this->expense_claim_item;
    }

    public function setExpenseClaimItemId(?ExpenseClaimItem $expense_claim_item): self
    {
        $this->expense_claim_item = $expense_claim_item;

        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setData($data): self
    {
        $this->data = $data;

        return $this;
    }
}
