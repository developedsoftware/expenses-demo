<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StudyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StudyRepository::class)]
#[ApiResource]
class Study
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $study_reference = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'study', targetEntity: PatientStudySiteVisit::class, orphanRemoval: true)]
    private Collection $patientStudySiteVisits;

    public function __construct()
    {
        $this->patientStudySiteVisits = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStudyReference(): ?string
    {
        return $this->study_reference;
    }

    public function setStudyReference(string $study_reference): self
    {
        $this->study_reference = $study_reference;

        return $this;
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
     * @return Collection<int, PatientStudySiteVisit>
     */
    public function getPatientStudySiteVisits(): Collection
    {
        return $this->patientStudySiteVisits;
    }

    public function addPatientStudySiteVisit(PatientStudySiteVisit $patientStudySiteVisit): self
    {
        if (!$this->patientStudySiteVisits->contains($patientStudySiteVisit)) {
            $this->patientStudySiteVisits->add($patientStudySiteVisit);
            $patientStudySiteVisit->setStudyId($this);
        }

        return $this;
    }

    public function removePatientStudySiteVisit(PatientStudySiteVisit $patientStudySiteVisit): self
    {
        if ($this->patientStudySiteVisits->removeElement($patientStudySiteVisit)) {
            // set the owning side to null (unless already changed)
            if ($patientStudySiteVisit->getStudyId() === $this) {
                $patientStudySiteVisit->setStudyId(null);
            }
        }

        return $this;
    }
}
