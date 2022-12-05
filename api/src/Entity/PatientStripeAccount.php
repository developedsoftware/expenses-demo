<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PatientStripeAccountRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientStripeAccountRepository::class)]
#[ApiResource]
class PatientStripeAccount
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'patientStripeAccount', cascade: ['persist', 'remove'])]
    private ?Patient $patient = null;

    #[ORM\Column(length: 255)]
    private ?string $stripe_account_uuid = null;

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

    public function getStripeAccountUuid(): ?string
    {
        return $this->stripe_account_uuid;
    }

    public function setStripeAccountUuid(string $stripe_account_uuid): self
    {
        $this->stripe_account_uuid = $stripe_account_uuid;

        return $this;
    }
}
