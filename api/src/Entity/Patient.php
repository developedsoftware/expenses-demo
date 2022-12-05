<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PatientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
#[ApiResource]
class Patient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $registration = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $first_name = null;

    #[ORM\Column(length: 255)]
    private ?string $last_name = null;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: PatientAddress::class, orphanRemoval: true)]
    private Collection $patientAddresses;

    #[ORM\OneToOne(mappedBy: 'patient', cascade: ['persist', 'remove'])]
    private ?PatientStripeAccount $patientStripeAccount = null;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: PatientStudySiteVisit::class, orphanRemoval: true)]
    private Collection $patientStudySiteVisits;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: ExpenseClaim::class)]
    private Collection $expenseClaims;

    public function __construct()
    {
        $this->patientAddresses = new ArrayCollection();
        $this->patientStudySiteVisits = new ArrayCollection();
        $this->expenseClaims = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegistrationId(): ?int
    {
        return $this->registration;
    }

    public function setRegistrationId(?int $registration): self
    {
        $this->registration = $registration;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): self
    {
        $this->last_name = $last_name;

        return $this;
    }

    /**
     * @return Collection<int, PatientAddress>
     */
    public function getPatientAddresses(): Collection
    {
        return $this->patientAddresses;
    }

    public function addPatientAddress(PatientAddress $patientAddress): self
    {
        if (!$this->patientAddresses->contains($patientAddress)) {
            $this->patientAddresses->add($patientAddress);
            $patientAddress->setPatientId($this);
        }

        return $this;
    }

    public function removePatientAddress(PatientAddress $patientAddress): self
    {
        if ($this->patientAddresses->removeElement($patientAddress)) {
            // set the owning side to null (unless already changed)
            if ($patientAddress->getPatientId() === $this) {
                $patientAddress->setPatientId(null);
            }
        }

        return $this;
    }

    public function getPatientStripeAccount(): ?PatientStripeAccount
    {
        return $this->patientStripeAccount;
    }

    public function setPatientStripeAccount(?PatientStripeAccount $patientStripeAccount): self
    {
        // unset the owning side of the relation if necessary
        if ($patientStripeAccount === null && $this->patientStripeAccount !== null) {
            $this->patientStripeAccount->setPatientId(null);
        }

        // set the owning side of the relation if necessary
        if ($patientStripeAccount !== null && $patientStripeAccount->getPatientId() !== $this) {
            $patientStripeAccount->setPatientId($this);
        }

        $this->patientStripeAccount = $patientStripeAccount;

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
            $patientStudySiteVisit->setPatientId($this);
        }

        return $this;
    }

    public function removePatientStudySiteVisit(PatientStudySiteVisit $patientStudySiteVisit): self
    {
        if ($this->patientStudySiteVisits->removeElement($patientStudySiteVisit)) {
            // set the owning side to null (unless already changed)
            if ($patientStudySiteVisit->getPatientId() === $this) {
                $patientStudySiteVisit->setPatientId(null);
            }
        }

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
            $expenseClaim->setPatientId($this);
        }

        return $this;
    }

    public function removeExpenseClaim(ExpenseClaim $expenseClaim): self
    {
        if ($this->expenseClaims->removeElement($expenseClaim)) {
            // set the owning side to null (unless already changed)
            if ($expenseClaim->getPatientId() === $this) {
                $expenseClaim->setPatientId(null);
            }
        }

        return $this;
    }
}
