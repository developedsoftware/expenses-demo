<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\SiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiProperty;

#[ORM\Entity(repositoryClass: SiteRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'reference' => 'exact'])]
class Site
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $reference = null;

    #[ORM\OneToMany(mappedBy: 'site', targetEntity: Claim::class)]
    private Collection $claims;

    public function __construct()
    {
        $this->claims = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    #[ApiProperty(iris: ['http://schema.org/name'])]
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    /**
     * @return Collection<int, Claim>
     */
    public function getClaims(): Collection
    {
        return $this->claims;
    }

//    public function addClaim(Claim $claim): self
//    {
//        if (!$this->claims->contains($claim)) {
//            $this->claims->add($claim);
//            $claim->setSite($this);
//        }
//
//        return $this;
//    }
//
//    public function removeClaim(Claim $claim): self
//    {
//        if ($this->claims->removeElement($claim)) {
//            // set the owning side to null (unless already changed)
//            if ($claim->getSite() === $this) {
//                $claim->setSite(null);
//            }
//        }
//
//        return $this;
//    }
}
