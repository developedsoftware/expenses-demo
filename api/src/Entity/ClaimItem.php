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
    private ?Claim $claim = null;

    #[ORM\ManyToOne]
    private ?ExpenseType $expenseType = null;

    #[ORM\ManyToOne]
    private ?Currency $currency = null;

    #[ORM\Column(nullable: true)]
    private ?int $amount = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $additionalInfo = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $claimTimestamp = null;

    #[ORM\OneToMany(mappedBy: 'claimItem', targetEntity: ClaimItemReceipt::class)]
    private Collection $claimItemReceipts;

    public function __construct()
    {
        $this->claimItemReceipts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClaim(): ?Claim
    {
        return $this->claim;
    }

    public function setClaim(?Claim $claim): self
    {
        $this->claim = $claim;

        return $this;
    }

    public function getExpenseType(): ?ExpenseType
    {
        return $this->expenseType;
    }

    public function setExpenseType(?ExpenseType $expenseType): self
    {
        $this->expenseType = $expenseType;

        return $this;
    }

    public function getCurrency(): ?Currency
    {
        return $this->currency;
    }

    public function setCurrency(?Currency $currency): self
    {
        $this->currency = $currency;

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
            $claimItemReceipt->setClaimItem($this);
        }

        return $this;
    }

    public function removeClaimItemReceipt(ClaimItemReceipt $claimItemReceipt): self
    {
        if ($this->claimItemReceipts->removeElement($claimItemReceipt)) {
            // set the owning side to null (unless already changed)
            if ($claimItemReceipt->getClaimItem() === $this) {
                $claimItemReceipt->setClaimItem(null);
            }
        }

        return $this;
    }
}
