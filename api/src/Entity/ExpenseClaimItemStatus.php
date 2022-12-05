<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExpenseClaimItemStatusRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseClaimItemStatusRepository::class)]
#[ApiResource]
class ExpenseClaimItemStatus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\OneToMany(mappedBy: 'expense_claim_item_status', targetEntity: ExpenseClaimItem::class)]
    private Collection $expenseClaimItems;

    public function __construct()
    {
        $this->expenseClaimItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

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
            $expenseClaimItem->setExpenseClaimItemStatusId($this);
        }

        return $this;
    }

    public function removeExpenseClaimItem(ExpenseClaimItem $expenseClaimItem): self
    {
        if ($this->expenseClaimItems->removeElement($expenseClaimItem)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaimItem->getExpenseClaimItemStatusId() === $this) {
                $expenseClaimItem->setExpenseClaimItemStatusId(null);
            }
        }

        return $this;
    }
}
