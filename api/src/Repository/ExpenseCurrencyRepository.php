<?php

namespace App\Repository;

use App\Entity\ExpenseCurrency;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExpenseCurrency>
 *
 * @method ExpenseCurrency|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExpenseCurrency|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExpenseCurrency[]    findAll()
 * @method ExpenseCurrency[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseCurrencyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExpenseCurrency::class);
    }

    public function save(ExpenseCurrency $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExpenseCurrency $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ExpenseCurrency[] Returns an array of ExpenseCurrency objects
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

//    public function findOneBySomeField($value): ?ExpenseCurrency
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
