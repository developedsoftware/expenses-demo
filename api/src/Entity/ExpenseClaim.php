<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExpenseClaimRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseClaimRepository::class)]
#[ApiResource]
class ExpenseClaim
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaims')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\ManyToOne(inversedBy: 'expenseClaims')]
    #[ORM\JoinColumn(nullable: false)]
    private ?PatientStudySiteVisit $patient_study_site_visit = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?ExpenseClaimStatus $expense_claim_status = null;

    #[ORM\OneToMany(mappedBy: 'expense_claim', targetEntity: ExpenseClaimItem::class, orphanRemoval: true)]
    private Collection $expenseClaimItems;

    public function __construct()
    {
        $this->expenseClaimItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPatientId(): ?Patient
    {
        return $this->patient;
    }

    public function setPatientId(?Patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getPatientStudySiteVisitId(): ?PatientStudySiteVisit
    {
        return $this->patient_study_site_visit;
    }

    public function setPatientStudySiteVisitId(?PatientStudySiteVisit $patient_study_site_visit): self
    {
        $this->patient_study_site_visit = $patient_study_site_visit;

        return $this;
    }

    public function getExpenseClaimStatusId(): ?ExpenseClaimStatus
    {
        return $this->expense_claim_status;
    }

    public function setExpenseClaimStatusId(?ExpenseClaimStatus $expense_claim_status): self
    {
        $this->expense_claim_status = $expense_claim_status;

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
            $expenseClaimItem->setExpenseClaimId($this);
        }

        return $this;
    }

    public function removeExpenseClaimItem(ExpenseClaimItem $expenseClaimItem): self
    {
        if ($this->expenseClaimItems->removeElement($expenseClaimItem)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaimItem->getExpenseClaimId() === $this) {
                $expenseClaimItem->setExpenseClaimId(null);
            }
        }

        return $this;
    }
}
