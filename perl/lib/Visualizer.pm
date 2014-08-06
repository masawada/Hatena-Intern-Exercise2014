package Visualizer;
use strict;
use warnings;

use Data::Dumper;

sub new {
  my ($class, $logs) = @_;
  return bless { logs => $logs }, $class;
};

sub print_errors_rate_by_reqtime {
  my $self = shift;
  my %grouped;
  my $error = 0;
  my $success = 0;

  for my $log (@{$self->{logs}}) {
    # per 100 msec
    my $hmsec = sprintf "%d", int($log->{reqtime_microsec} / 100000);
    if (!$grouped{$hmsec}) { $grouped{$hmsec} = []; }
    push($grouped{$hmsec}, $log);
  }

  for my $reqtime (sort keys %grouped) {
    $error = 0;
    $success = 0;
    for my $log (@{$grouped{$reqtime}}) {
      if($log->{status} =~ /^(5|4)\d{2}$/) {
        $error++;
      } else {
        $success++;
      }
    }
    if ($success > 0 || $error > 0) {
      print $reqtime, "00msec: ";
      &print_errors_rate($success, $error);
      print "\n";
    }
  }

}

# &printe_errors_rate(success, error);
sub print_errors_rate {
  my $print_length = 20;
  my $error_rate = int($_[1] / ($_[0] + $_[1])*$print_length);
  my $success_rate = $print_length - $error_rate;

  print "\e[32m";
  while ($success_rate--) {
    print "=";
  }
  print "\e[31m";
  while ($error_rate--) {
    print "=";
  }
  print "\e[0m";
}

1;
