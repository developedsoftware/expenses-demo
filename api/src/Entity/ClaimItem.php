<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClaimItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClaimItemRepository::class)]
#[ApiResource]
class ClaimItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'claimItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Claim $claimId = null;

    #[ORM\ManyToOne]
    private ?ExpenseType $expenseTypeId = null;

    #[ORM\ManyToOne]
    private ?Currency $currencyId = null;

    #[ORM\Column(nullable: true)]
    private ?int $amount = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $additionalInfo = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $claimTimestamp = null;

    #[ORM\OneToMany(mappedBy: 'claimItemId', targetEntity: ClaimItemReceipt::class)]
    private Collection $claimItemReceipts;

    public function __construct()
    {
        $this->claimItemReceipts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClaimId(): ?Claim
    {
        return $this->claimId;
    }

    public function setClaimId(?Claim $claimId): self
    {
        $this->claimId = $claimId;

        return $this;
    }

    public function getExpenseTypeId(): ?ExpenseType
    {
        return $this->expenseTypeId;
    }

    public function setExpenseTypeId(?ExpenseType $expenseTypeId): self
    {
        $this->expenseTypeId = $expenseTypeId;

        return $this;
    }

    public function getCurrencyId(): ?Currency
    {
        return $this->currencyId;
    }

    public function setCurrencyId(?Currency $currencyId): self
    {
        $this->currencyId = $currencyId;

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
        return $this->additionalInfo;
    }

    public function setAdditionalInfo(?string $additionalInfo): self
    {
        $this->additionalInfo = $additionalInfo;

        return $this;
    }

    public function getClaimTimestamp(): ?\DateTimeImmutable
    {
        return $this->claimTimestamp;
    }

    public function setClaimTimestamp(?\DateTimeImmutable $claimTimestamp): self
    {
        $this->claimTimestamp = $claimTimestamp;

        return $this;
    }

    /**
     * @return Collection<int, ClaimItemReceipt>
     */
    public function getClaimItemReceipts(): Collection
    {
        return $this->claimItemReceipts;
    }

    public function addClaimItemReceipt(ClaimItemReceipt $claimItemReceipt): self
    {
        if (!$this->claimItemReceipts->contains($claimItemReceipt)) {
            $this->claimItemReceipts->add($claimItemReceipt);
            $claimItemReceipt->setClaimItemId($this);
        }

        return $this;
    }

    public function removeClaimItemReceipt(ClaimItemReceipt $claimItemReceipt): self
    {
        if ($this->claimItemReceipts->removeElement($claimItemReceipt)) {
            // set the owning side to null (unless already changed)
            if ($claimItemReceipt->getClaimItemId() === $this) {
                $claimItemReceipt->setClaimItemId(null);
            }
        }

        return $this;
    }
}
