<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExpenseTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseTypeRepository::class)]
#[ApiResource]
class ExpenseType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'expense_type', targetEntity: ExpenseClaimItem::class)]
    private Collection $expenseClaimItems;

    public function __construct()
    {
        $this->expenseClaimItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
            $expenseClaimItem->setExpenseTypeId($this);
        }

        return $this;
    }

    public function removeExpenseClaimItem(ExpenseClaimItem $expenseClaimItem): self
    {
        if ($this->expenseClaimItems->removeElement($expenseClaimItem)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaimItem->getExpenseTypeId() === $this) {
                $expenseClaimItem->setExpenseTypeId(null);
            }
        }

        return $this;
    }
}
