<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClaimItemReceiptRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClaimItemReceiptRepository::class)]
#[ApiResource]
class ClaimItemReceipt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'claimItemReceipts')]
    private ?ClaimItem $claimItemId = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $data = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClaimItemId(): ?ClaimItem
    {
        return $this->claimItemId;
    }

    public function setClaimItemId(?ClaimItem $claimItemId): self
    {
        $this->claimItemId = $claimItemId;

        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setData($data): self
    {
        $this->data = $data;

        return $this;
    }
}
