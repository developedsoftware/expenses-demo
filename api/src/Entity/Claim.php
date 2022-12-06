<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClaimRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClaimRepository::class)]
#[ApiResource]
class Claim
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $submittedAt = null;

    #[ORM\ManyToOne(inversedBy: 'claims')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patientId = null;

    #[ORM\OneToMany(mappedBy: 'claim', targetEntity: Study::class)]
    private Collection $studyId;

    #[ORM\ManyToOne(inversedBy: 'claims')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Site $siteId = null;

    #[ORM\ManyToOne]
    private ?ClaimStatus $claimStatusId = null;

    #[ORM\OneToMany(mappedBy: 'claimId', targetEntity: ClaimItem::class)]
    private Collection $claimItems;

    public function __construct()
    {
        $this->studyId = new ArrayCollection();
        $this->claimItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getSubmittedAt(): ?\DateTimeImmutable
    {
        return $this->submittedAt;
    }

    public function setSubmittedAt(?\DateTimeImmutable $submittedAt): self
    {
        $this->submittedAt = $submittedAt;

        return $this;
    }

    public function getPatientId(): ?Patient
    {
        return $this->patientId;
    }

    public function setPatientId(?Patient $patientId): self
    {
        $this->patientId = $patientId;

        return $this;
    }

    /**
     * @return Collection<int, Study>
     */
    public function getStudyId(): Collection
    {
        return $this->studyId;
    }

    public function addStudyId(Study $studyId): self
    {
        if (!$this->studyId->contains($studyId)) {
            $this->studyId->add($studyId);
            $studyId->setClaim($this);
        }

        return $this;
    }

    public function removeStudyId(Study $studyId): self
    {
        if ($this->studyId->removeElement($studyId)) {
            // set the owning side to null (unless already changed)
            if ($studyId->getClaim() === $this) {
                $studyId->setClaim(null);
            }
        }

        return $this;
    }

    public function getSiteId(): ?Site
    {
        return $this->siteId;
    }

    public function setSiteId(?Site $siteId): self
    {
        $this->siteId = $siteId;

        return $this;
    }

    public function getClaimStatusId(): ?ClaimStatus
    {
        return $this->claimStatusId;
    }

    public function setClaimStatusId(?ClaimStatus $claimStatusId): self
    {
        $this->claimStatusId = $claimStatusId;

        return $this;
    }

    /**
     * @return Collection<int, ClaimItem>
     */
    public function getClaimItems(): Collection
    {
        return $this->claimItems;
    }

    public function addClaimItem(ClaimItem $claimItem): self
    {
        if (!$this->claimItems->contains($claimItem)) {
            $this->claimItems->add($claimItem);
            $claimItem->setClaimId($this);
        }

        return $this;
    }

    public function removeClaimItem(ClaimItem $claimItem): self
    {
        if ($this->claimItems->removeElement($claimItem)) {
            // set the owning side to null (unless already changed)
            if ($claimItem->getClaimId() === $this) {
                $claimItem->setClaimId(null);
            }
        }

        return $this;
    }
}
