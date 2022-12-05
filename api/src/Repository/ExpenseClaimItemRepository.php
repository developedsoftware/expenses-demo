<?php

namespace App\Repository;

use App\Entity\ExpenseClaimItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExpenseClaimItem>
 *
 * @method ExpenseClaimItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExpenseClaimItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExpenseClaimItem[]    findAll()
 * @method ExpenseClaimItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseClaimItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExpenseClaimItem::class);
    }

    public function save(ExpenseClaimItem $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExpenseClaimItem $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ExpenseClaimItem[] Returns an array of ExpenseClaimItem objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ExpenseClaimItem
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
