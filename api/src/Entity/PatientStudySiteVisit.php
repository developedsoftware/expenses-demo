<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PatientStudySiteVisitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientStudySiteVisitRepository::class)]
#[ApiResource]
class PatientStudySiteVisit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'patientStudySiteVisits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\ManyToOne(inversedBy: 'patientStudySiteVisits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Study $study = null;

    #[ORM\ManyToOne(inversedBy: 'patientStudySiteVisits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Site $site = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $visit_timestamp = null;

    #[ORM\OneToMany(mappedBy: 'patient_study_site_visit', targetEntity: ExpenseClaim::class)]
    private Collection $expenseClaims;

    public function __construct()
    {
        $this->expenseClaims = new ArrayCollection();
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

    public function getStudyId(): ?Study
    {
        return $this->study;
    }

    public function setStudyId(?Study $study): self
    {
        $this->study = $study;

        return $this;
    }

    public function getSiteId(): ?Site
    {
        return $this->site;
    }

    public function setSiteId(?Site $site): self
    {
        $this->site = $site;

        return $this;
    }

    public function getVisitTimestamp(): ?\DateTimeInterface
    {
        return $this->visit_timestamp;
    }

    public function setVisitTimestamp(\DateTimeInterface $visit_timestamp): self
    {
        $this->visit_timestamp = $visit_timestamp;

        return $this;
    }

    /**
     * @return Collection<int, ExpenseClaim>
     */
    public function getExpenseClaims(): Collection
    {
        return $this->expenseClaims;
    }

    public function addExpenseClaim(ExpenseClaim $expenseClaim): self
    {
        if (!$this->expenseClaims->contains($expenseClaim)) {
            $this->expenseClaims->add($expenseClaim);
            $expenseClaim->setPatientStudySiteVisitId($this);
        }

        return $this;
    }

    public function removeExpenseClaim(ExpenseClaim $expenseClaim): self
    {
        if ($this->expenseClaims->removeElement($expenseClaim)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaim->getPatientStudySiteVisitId() === $this) {
                $expenseClaim->setPatientStudySiteVisitId(null);
            }
        }

        return $this;
    }
}
