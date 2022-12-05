<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SiteRepository::class)]
#[ApiResource]
class Site
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $site_reference = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'site', targetEntity: PatientStudySiteVisit::class, orphanRemoval: true)]
    private Collection $patientStudySiteVisits;

    public function __construct()
    {
        $this->patientStudySiteVisits = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSiteReference(): ?string
    {
        return $this->site_reference;
    }

    public function setSiteReference(string $site_reference): self
    {
        $this->site_reference = $site_reference;

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
            $patientStudySiteVisit->setSiteId($this);
        }

        return $this;
    }

    public function removePatientStudySiteVisit(PatientStudySiteVisit $patientStudySiteVisit): self
    {
        if ($this->patientStudySiteVisits->removeElement($patientStudySiteVisit)) {
            // set the owning side to null (unless already changed)
            if ($patientStudySiteVisit->getSiteId() === $this) {
                $patientStudySiteVisit->setSiteId(null);
            }
        }

        return $this;
    }
}
