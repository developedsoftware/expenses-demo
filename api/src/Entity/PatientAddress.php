<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PatientAddressRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientAddressRepository::class)]
#[ApiResource]
class PatientAddress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'patientAddresses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Patient $patient = null;

    #[ORM\Column(length: 255)]
    private ?string $address_line_1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address_line_2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address_line_3 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address_line_4 = null;

    #[ORM\Column(length: 255)]
    private ?string $area_code = null;

    #[ORM\Column(length: 255)]
    private ?string $country_code = null;

    #[ORM\Column]
    private ?bool $is_primary = null;

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

    public function getAddressLine1(): ?string
    {
        return $this->address_line_1;
    }

    public function setAddressLine1(string $address_line_1): self
    {
        $this->address_line_1 = $address_line_1;

        return $this;
    }

    public function getAddressLine2(): ?string
    {
        return $this->address_line_2;
    }

    public function setAddressLine2(?string $address_line_2): self
    {
        $this->address_line_2 = $address_line_2;

        return $this;
    }

    public function getAddressLine3(): ?string
    {
        return $this->address_line_3;
    }

    public function setAddressLine3(?string $address_line_3): self
    {
        $this->address_line_3 = $address_line_3;

        return $this;
    }

    public function getAddressLine4(): ?string
    {
        return $this->address_line_4;
    }

    public function setAddressLine4(?string $address_line_4): self
    {
        $this->address_line_4 = $address_line_4;

        return $this;
    }

    public function getAreaCode(): ?string
    {
        return $this->area_code;
    }

    public function setAreaCode(string $area_code): self
    {
        $this->area_code = $area_code;

        return $this;
    }

    public function getCountryCode(): ?string
    {
        return $this->country_code;
    }

    public function setCountryCode(string $country_code): self
    {
        $this->country_code = $country_code;

        return $this;
    }

    public function isIsPrimary(): ?bool
    {
        return $this->is_primary;
    }

    public function setIsPrimary(bool $is_primary): self
    {
        $this->is_primary = $is_primary;

        return $this;
    }
}
