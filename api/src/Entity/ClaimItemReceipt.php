<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
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
    private ?ClaimItem $claimItem = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $data = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClaimItem(): ?ClaimItem
    {
        return $this->claimItem;
    }

    public function setClaimItem(?ClaimItem $claimItem): self
    {
        $this->claimItem = $claimItem;

        return $this;
    }
    
    #[ApiProperty(iris: ['http://schema.org/name'])]
    public function getPreview(): string
    {
        return "some preview here";
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
