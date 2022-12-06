<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use App\Repository\ClaimRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClaimRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['patient' => 'exact', 'study' => 'exact', 'site' => 'exact', 'claimStatus' => 'exact'])]
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
    private ?Patient $patient = null;

    #[ORM\ManyToOne(inversedBy: 'claims')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Study $study = null;

    #[ORM\ManyToOne(inversedBy: 'claims')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Site $site = null;

    #[ORM\ManyToOne]
    private ?ClaimStatus $claimStatus = null;
    
    #[ORM\OneToMany(mappedBy: 'claim', targetEntity: ClaimItem::class)]
    private Collection $claimItems;

    public function __construct()
    {
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

    public function getPatient(): ?Patient
    {
        return $this->patient;
    }

    public function setPatient(?Patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getStudy(): ?Study
    {
        return $this->study;
    }

    public function setStudy(?Study $study): self
    {
        $this->study = $study;

        return $this;
    }

    public function getSite(): ?Site
    {
        return $this->site;
    }

    public function setSite(?Site $site): self
    {
        $this->site = $site;

        return $this;
    }
    
    #[ApiProperty(iris: ['http://schema.org/name'])]
    public function getClaimReference() {
        return "{$this->getSite()->getReference()}{$this->getId()}";
    }

    public function getClaimStatus(): ?ClaimStatus
    {
        return $this->claimStatus;
    }

    public function setClaimStatus(?ClaimStatus $claimStatus): self
    {
        $this->claimStatus = $claimStatus;

        return $this;
    }
}
