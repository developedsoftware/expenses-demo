<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExpenseClaimItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseClaimItemRepository::class)]
#[ApiResource]
class ExpenseClaimItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaimItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ExpenseClaim $expense_claim = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaimItems')]
    private ?ExpenseType $expense_type = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaimItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ExpenseCurrency $expense_currency = null;

    #[ORM\Column(nullable: true)]
    private ?int $amount = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $additional_info = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaimItems')]
    private ?ExpenseClaimItemStatus $expense_claim_item_status = null;

    #[ORM\OneToMany(mappedBy: 'expense_claim_item', targetEntity: ExpenseClaimItemReceipt::class, orphanRemoval: true)]
    private Collection $expenseClaimItemReceipts;

    public function __construct()
    {
        $this->expenseClaimItemReceipts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExpenseClaimId(): ?ExpenseClaim
    {
        return $this->expense_claim;
    }

    public function setExpenseClaimId(?ExpenseClaim $expense_claim): self
    {
        $this->expense_claim = $expense_claim;

        return $this;
    }

    public function getExpenseTypeId(): ?ExpenseType
    {
        return $this->expense_type;
    }

    public function setExpenseTypeId(?ExpenseType $expense_type): self
    {
        $this->expense_type = $expense_type;

        return $this;
    }

    public function getExpenseCurrencyId(): ?ExpenseCurrency
    {
        return $this->expense_currency;
    }

    public function setExpenseCurrencyId(?ExpenseCurrency $expense_currency): self
    {
        $this->expense_currency = $expense_currency;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(?int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getAdditionalInfo(): ?string
    {
        return $this->additional_info;
    }

    public function setAdditionalInfo(?string $additional_info): self
    {
        $this->additional_info = $additional_info;

        return $this;
    }

    public function getExpenseClaimItemStatusId(): ?ExpenseClaimItemStatus
    {
        return $this->expense_claim_item_status;
    }

    public function setExpenseClaimItemStatusId(?ExpenseClaimItemStatus $expense_claim_item_status): self
    {
        $this->expense_claim_item_status = $expense_claim_item_status;

        return $this;
    }

    /**
     * @return Collection<int, ExpenseClaimItemReceipt>
     */
    public function getExpenseClaimItemReceipts(): Collection
    {
        return $this->expenseClaimItemReceipts;
    }

    public function addExpenseClaimItemReceipt(ExpenseClaimItemReceipt $expenseClaimItemReceipt): self
    {
        if (!$this->expenseClaimItemReceipts->contains($expenseClaimItemReceipt)) {
            $this->expenseClaimItemReceipts->add($expenseClaimItemReceipt);
            $expenseClaimItemReceipt->setExpenseClaimItemId($this);
        }

        return $this;
    }

    public function removeExpenseClaimItemReceipt(ExpenseClaimItemReceipt $expenseClaimItemReceipt): self
    {
        if ($this->expenseClaimItemReceipts->removeElement($expenseClaimItemReceipt)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaimItemReceipt->getExpenseClaimItemId() === $this) {
                $expenseClaimItemReceipt->setExpenseClaimItemId(null);
            }
        }

        return $this;
    }
}
