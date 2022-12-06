<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PatientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['registrationNumber' => 'exact', 'email' => 'partial', 'firstName' => 'partial', 'lastName' => 'partial'])]
class Patient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $registrationNumber = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: PatientAddress::class, orphanRemoval: true)]
    private Collection $patientAddresses;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: PatientPaymentGateway::class, orphanRemoval: true)]
    private Collection $patientPaymentGateways;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: Claim::class, orphanRemoval: true)]
    private Collection $claims;


    public function __construct()
    {
        $this->patientAddresses = new ArrayCollection();
        $this->patientPaymentGateways = new ArrayCollection();
        $this->claims = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
    
    #[ApiProperty(iris: ['http://schema.org/name'])]
    public function getName(): ?string
    {
        return "{$this->getFirstName()} {$this->getLastName()}";
    }

    public function getRegistrationNumber(): ?int
    {
        return $this->registrationNumber;
    }

    public function setRegistrationNumber(int $registrationNumber): self
    {
        $this->registrationNumber = $registrationNumber;

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

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

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
            $patientAddress->setPatient($this);
        }

        return $this;
    }

    public function removePatientAddress(PatientAddress $patientAddress): self
    {
        if ($this->patientAddresses->removeElement($patientAddress)) {
            // set the owning side to null (unless already changed)
            if ($patientAddress->getPatient() === $this) {
                $patientAddress->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Claim>
     */
    public function getClaims(): Collection
    {
        return $this->claims;
    }

    public function addClaim(Claim $claim): self
    {
        if (!$this->claims->contains($claim)) {
            $this->claims->add($claim);
            $claim->setPatient($this);
        }

        return $this;
    }

    public function removeClaim(Claim $claim): self
    {
        if ($this->claims->removeElement($claim)) {
            // set the owning side to null (unless already changed)
            if ($claim->getPatient() === $this) {
                $claim->setPatient(null);
            }
        }

        return $this;
    }
}
