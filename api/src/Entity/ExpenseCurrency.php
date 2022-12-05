<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExpenseCurrencyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseCurrencyRepository::class)]
#[ApiResource]
class ExpenseCurrency
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $currency = null;

    #[ORM\OneToMany(mappedBy: 'expense_currency', targetEntity: ExpenseClaimItem::class)]
    private Collection $expenseClaimItems;

    public function __construct()
    {
        $this->expenseClaimItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): self
    {
        $this->currency = $currency;

        return $this;
    }

    /**
     * @return Collection<int, ExpenseClaimItem>
     */
    public function getExpenseClaimItems(): Collection
    {
        return $this->expenseClaimItems;
    }

    public function addExpenseClaimItem(ExpenseClaimItem $expenseClaimItem): self
    {
        if (!$this->expenseClaimItems->contains($expenseClaimItem)) {
            $this->expenseClaimItems->add($expenseClaimItem);
            $expenseClaimItem->setExpenseCurrencyId($this);
        }

        return $this;
    }

    public function removeExpenseClaimItem(ExpenseClaimItem $expenseClaimItem): self
    {
        if ($this->expenseClaimItems->removeElement($expenseClaimItem)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaimItem->getExpenseCurrencyId() === $this) {
                $expenseClaimItem->setExpenseCurrencyId(null);
            }
        }

        return $this;
    }
}
